using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SearchHire.Data.Entities;
using SearchHire.Data.Repositories;

namespace SearchHire.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository _cityRepository;

        public CityController(ICityRepository _cityRepository)
        {
            this._cityRepository = _cityRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            List<City> cities = await _cityRepository.GetAllAsync();
            return Ok(cities);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            City city = _cityRepository.GetById(id);
            return Ok(city);
        }

        [HttpPost]
        public IActionResult Create(City city) 
        { 
            _cityRepository.Create(city);
            return Ok(city);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update([FromBody] City city)
        {
            _cityRepository.Update(city);
            return Ok(city);
        }

        [HttpGet]
        [Route("GetCitiesByProvince/{provinceId:int}")]
        public async Task<IActionResult> GetCitiesByProvince(int provinceId)
        {
            List<City> cities = await _cityRepository.GetCitiesByProvince(provinceId);
            return Ok(cities);
        }
    }
}
