using API.Data;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
                                                        IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(options =>
                //                options.UseSqlServer(_config.GetConnectionString("HunterCoreDb")));
                options.UseSqlite(config.GetConnectionString("HunterCoreLite")));


            // services.AddScoped<IUserRepository, UserRepository>();
            // services.AddAutoMapper(typeof(Helpers.AutoMapperProfiles).Assembly);

            return services;
        }
    }
}