using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
using Newtonsoft.Json;
using AutoMapper;

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
            services.AddDbContext<DataContext>(options =>
                  options.UseSqlServer(_config.GetConnectionString("HunterCoreDb")));
            services.AddControllers().AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.ReferenceLoopHandling =
                Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddCors();

            //services.AddAutoMapper(typeof(ProjectRepository).Assembly);
            // services.AddScoped<IAuthRepository, AuthRepository>();
            // services.AddScoped<ILogRepository, LogRepository>();
            // services.AddScoped<IUserRepository, UserRepository>();
            // services.AddScoped<IRandomCacheRepository, RandomCacheRepository>();

            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //     .AddJwtBearer(options => {
            //         options.TokenValidationParameters = new TokenValidationParameters
            //         {
            //             ValidateIssuerSigningKey = true,
            //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
            //                 .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
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
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

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
