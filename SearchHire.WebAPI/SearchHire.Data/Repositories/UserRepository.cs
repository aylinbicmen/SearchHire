using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SearchHire.Data.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IGenericRepository<User> _genericRepository;
        private readonly SearchHireDbContext _context;
        private readonly IConfiguration _configuration;

        public UserRepository(IGenericRepository<User> _genericRepository, SearchHireDbContext _context,IConfiguration _configuration)
        {
            this._genericRepository = _genericRepository;
            this._context = _context;
            this._configuration = _configuration;
        }

        public void Create(User entity)
        {
            _genericRepository.Create(entity);
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _genericRepository.GetAllAsync();
        }

        public async Task<List<User>> GetAllMasterUsersBySpecialtyAndOrCityId(int specialtyId, int cityId = 0)
        {
            List<User> users = new List<User>();

            if(cityId == 0)
            {
                users = await _context.Users.Where(u => u.IsMasterUser == true && u.SpecialtyId == specialtyId).ToListAsync();
            }
            else
            {
                users = await _context.Users.Where(u => u.IsMasterUser == true && u.SpecialtyId == specialtyId && u.CityId == cityId).ToListAsync();
            }

            return users;
        }

        public User GetById(int id)
        {
            return _genericRepository.GetById(id);
        }

        public String Login(string email, string password)
        {
            User user = _context.Users.Where(u => u.Email == email && u.Password == password).First();

            string token = CreateToken(user);
            return token;
        }

        public void Update(User entity)
        {
            User userToBeUpdated = _context.Users.Where(u => u.Id == entity.Id).FirstOrDefault();
            userToBeUpdated.Name = entity.Name;
            userToBeUpdated.Surname = entity.Surname;
            userToBeUpdated.Phone = entity.Phone;
            userToBeUpdated.Address = entity.Address;
            userToBeUpdated.CityId = entity.CityId;
            userToBeUpdated.SpecialtyId = entity.SpecialtyId;

            _context.SaveChanges();
        }

        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("http://userdata/id",user.Id.ToString()),
                new Claim("http://userdata/name",user.Name),
                new Claim("http://userdata/surname",user.Surname),
                new Claim("http://userdata/email",user.Email),
                new Claim("http://userdata/phone",user.Phone == null ? "": user.Phone.ToString()),
                new Claim("http://userdata/address",user.Address == null ? "": user.Address.ToString()),
                new Claim("http://userdata/joindate",user.JoinDate.ToString()),
                new Claim("http://userdata/workdone",user.WorkDone.ToString() == null ? "": user.WorkDone.ToString()),
                new Claim("http://userdata/ismasteruser",user.IsMasterUser.ToString()),
                new Claim("http://userdata/isactive",user.IsActive.ToString()),
                new Claim("http://userdata/city",user.CityId.ToString()),
                new Claim("http://userdata/specialty",user.SpecialtyId.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires:DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public void MasterUserWorkDone(int id)
        {
            User masterUser = _context.Users.Where(u => u.Id == id).FirstOrDefault();
            masterUser.WorkDone++;
            _context.SaveChanges();
        }

        public void UserSubscribe(string email)
        {
            User user = _context.Users.Where(u => u.Email == email).FirstOrDefault();   
            user.IsSubscribed = true;
            _context.SaveChanges();
        }
    }
}
