using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_sportsintime.Models;
using Microsoft.AspNetCore.Cors;
using System.Security.Cryptography;

namespace backend_sportsintime.Controllers
{
    [Route("api/user")]
    [ApiController]
    [EnableCors("SportsintimePolicy")]
    public class UserController : ControllerBase
    {
        private readonly bdContext _context;

        public UserController(bdContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserToFront>>> GetUsers()
        {
            return await _context.Users
                .Select(x => UserToFrontEnd(x))
                .ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserToFront>> GetUser(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            return  UserToFrontEnd(user);
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(long id, UserDTO userDTO)
        {
            if (id != userDTO.Id)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Name = userDTO.Name;
            user.Email = userDTO.Email;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!UserExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut("changePassword/{id}")]
        public async Task<IActionResult> ChangeUserPassword(long id, ChangePassword changePassword)
        {
            var user = await _context.Users.FindAsync(id);
            if (!VerifyPasswordHash(changePassword.OldPassword, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }

            CreatePasswordHash(changePassword.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;

            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpPut]
        public async Task<IActionResult> BanUser(long id)
        {


            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            try
            {
                user.IsBanned = true;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!UserExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]

        public async Task<ActionResult<UserDTO>> CreateUser(UserDTO userDTO)
        {
            var user = new User
            {
                Email = userDTO.Email,
                Name = userDTO.Name,
                IsBanned = false,
                //Rank = userDTO.Rank
            };
            //System.Console.WriteLine(userDTO.IsBanned);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetUser),
                new { id = user.Id },
                UserToDTO(user));
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not found");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
        private static UserDTO UserToDTO(User user) =>
           new UserDTO
           {
               Id = user.Id,
               Name = user.Name,
               //Password = user.Password,
               Email = user.Email,
               //Rank = user.Rank,
               //IsBanned = user.IsBanned  
           };

        private static UserToFront UserToFrontEnd(User user) =>
        new UserToFront
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Rank = user.Rank,
        };
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
