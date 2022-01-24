using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using backend_sportsintime.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using backend_sportsintime.Hubs;
using Microsoft.Extensions.Hosting;
using Service.Background;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<bdContext>(options =>


    options.UseSqlServer(builder.Configuration.GetConnectionString("dbContext")));

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddCors(options => options.AddPolicy("SportsintimePolicy", policy => policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials()));



/* builder.Services.AddSwaggerGen(c =>
 {
     c.SwaggerDoc("v1", new() { Title = "backend_sportsintime v1", Version = "v1" });

 });*/



/*builder.Services.AddDbContext<bdContext>(opt =>
    opt.UseInMemoryDatabase("bdList"));*/


builder.Services.AddDbContext<bdContext>(b =>
b.UseLazyLoadingProxies().UseSqlServer("Password=sa123;Persist Security Info=False;User ID=sa;Initial Catalog=Sports;Data Source=LAPTOP-3UESU4T5\\SQLEXPRESS1"));



builder.Services.AddScoped<bdContext>();


builder.Services.AddHostedService<MyBackgroundService>();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });



var app = builder.Build();

// Configure the HTTP request pipeline.
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "backend_sportsintime v1"));
}

app.UseHttpsRedirection();

app.UseAuthentication();



app.MapControllers();

app.UseRouting();

app.UseAuthorization();

app.UseCors("SportsintimePolicy");

app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapDefaultControllerRoute();
            });

app.Run();