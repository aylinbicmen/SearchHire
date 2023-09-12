
using Microsoft.EntityFrameworkCore;
using SearchHire.Data.Entities;
using SearchHire.Data.Repositories;

namespace SearchHire.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var allowOrigin = "AllowOrigin";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(allowOrigin, builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<SearchHireDbContext>(options => options.UseSqlServer(connectionString));

            builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IPostRepository,PostRepository>();
            builder.Services.AddScoped<ISpecialtyRepository,SpecialtyRepository>();
            builder.Services.AddScoped<IProvinceRepository, ProvinceRepository>();
            builder.Services.AddScoped<ICityRepository, CityRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(allowOrigin);

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}