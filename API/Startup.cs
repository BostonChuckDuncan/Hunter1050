using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using API.Interfaces;
using API.Services;

namespace HunterServer
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(options =>
                //                options.UseSqlServer(_config.GetConnectionString("HunterCoreDb")));
                options.UseSqlite(_config.GetConnectionString("HunterCoreLite")));
            services.AddControllers();
            services.AddCors();
            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //     .AddJwtBearer(options =>
            //     {
            //         options.TokenValidateParameters = new TokenValidationParameters
            //         {
            //             ValidateIssuerSigningKey,
            //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"])),
            //             ValidateIssuer = false,
            //             ValidateAudience = false
            //         };
            //     });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            // else
            // {
            //     app.UseExceptionHandler(builder =>
            //     {
            //         builder.Run(async context =>
            //         {
            //             context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            //             var error = context.Features.Get<IExceptionHandlerFeature>();
            //             if (error != null)
            //             {
            //                 context.Response.AddApplicationError(error.Error.Message);
            //                 await context.Response.WriteAsync(error.Error.Message);
            //             }
            //         });
            //     });
            // }

            // app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                //                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
