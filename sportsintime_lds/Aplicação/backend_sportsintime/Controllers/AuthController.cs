
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using backend_sportsintime.Models;
/**
Controller que representa a autenticação do utilizador, contendo metodos para o login e registo
Assim como para a criação dos tokens a serem atribuidos aquando o login e 
a criação de uma hash para encriptação da password.
*/
namespace backend_sportsintime.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly bdContext _context;

        public AuthController(IConfiguration configuration, bdContext context)
        {
            _configuration = configuration;
            _context = context;

        }


        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDTO request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Name = request.Name,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                isAdmin = request.isAdmin,
                Email = request.Email,
                IsBanned = false,
                Rank = 0
            };

            bool emailFound = false;
            bool usernameFound = false;


            for (int i = 0; i < _context.Users.ToArray().Length; i++)
            {
                if (request.Email == _context.Users.ToArray()[i].Email)
                {
                    emailFound = true;
                    break;
                }
                if (request.Name == _context.Users.ToArray()[i].Name)
                {
                    usernameFound = true;
                    break;
                }
            }

            if (emailFound)
            {
                return BadRequest("Email already existing");
            }
            else if (usernameFound)
            {
                return BadRequest("Username already existing");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var user1 = new UserToFront
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Rank = user.Rank
            };

            return Ok(user1);
        }

        [HttpPost("login")]
        public async Task<ActionResult<Login>> Login(Login loginUser)
        {

            UserDTO request;
            UserController us = new UserController(_context);
            bool found = false;
            User user1 = new User();
            for (int i = 0; i < _context.Users.ToArray().Length; i++)
            {
                if (loginUser.Email == _context.Users.ToArray()[i].Email)
                {
                    request = UserToDTO(_context.Users.ToArray()[i]);
                    user1 = _context.Users.ToArray()[i];
                    found = true;
                    break;
                }
            }


            if (!found)
            {
                return BadRequest("User not found");
            }
            if (user1.IsBanned == true)
            {
                return BadRequest("User is banned");
            }

            if (!VerifyPasswordHash(loginUser.Password, user1.PasswordHash, user1.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }

            string token = CreateToken(user1);
            return Ok(token);
        }

        private string CreateToken(User user)
        {
            List<Claim> claims;

            System.Console.WriteLine(user.isAdmin);
            if (user.isAdmin)
            {

                claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.Name),
                new Claim("role", "Admin")
            };
            }
            else
            {
                claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.Name),
                new Claim("role", "User")
            };
            }


            //claims.ToArray().Length();

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }




        private static UserDTO UserToDTO(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                isAdmin = user.isAdmin
            };
        }
    }

}