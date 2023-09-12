using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SearchHire.Data.Entities;
using SearchHire.Data.Repositories;
using SearchHire.WebAPI.Models;

namespace SearchHire.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository _userRepository)
        {
            this._userRepository = _userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            List<User> users = await _userRepository.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id) 
        {
            User user = _userRepository.GetById(id);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AddUserModel user) 
        {
            _userRepository.Create(new User { Name = user.Name, Surname = user.Surname, Email = user.Email, Password = user.Password, JoinDate = user.JoinDate, IsMasterUser = user.IsMasterUser, IsActive = user.IsActive, WorkDone = user.WorkDone });
            return Ok(user);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update([FromBody] UpdateUserModel user) 
        {
            _userRepository.Update(new User { Name = user.Name, Surname = user.Surname, Phone = user.Phone, Address = user.Address, CityId = user.CityId, Id=user.Id, SpecialtyId=user.SpecialtyId});
            return Ok(user);
        }

        [HttpGet]
        [Route("MasterUsers/{specialtyId}/{cityId}")]
        public async Task<IActionResult> GetAllMasterUsersBySpecialtyAndOrCityId(int specialtyId, int cityId = 0)
        {
            List<User> users = await _userRepository.GetAllMasterUsersBySpecialtyAndOrCityId(specialtyId,cityId);
            return Ok(users);
        }

        [HttpPost("{email}/{password}")]
        public IActionResult Login(string email,string password)
        {
            string token = _userRepository.Login(email, password);
            return Ok(token);
        }

        [HttpPut]
        [Route("MasterUserWorkDone/{id:int}")]
        public IActionResult MasterUserWorkDone(int id) 
        { 
            _userRepository.MasterUserWorkDone(id);
            return Ok();
        }

        [HttpPut]
        [Route("UserSubscribe/{email}")]
        public IActionResult UserSubscribe(string email)
        {
            _userRepository.UserSubscribe(email);
            return Ok();
        }
    }
}
