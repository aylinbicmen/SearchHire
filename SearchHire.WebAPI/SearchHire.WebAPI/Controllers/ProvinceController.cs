using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SearchHire.Data.Entities;
using SearchHire.Data.Repositories;

namespace SearchHire.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvinceController : ControllerBase
    {
        private readonly IProvinceRepository _provinceRepository;

        public ProvinceController(IProvinceRepository _provinceRepository)
        {
            this._provinceRepository = _provinceRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            List<Province> provinces = await _provinceRepository.GetAllAsync();
            return Ok(provinces);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            Province province = _provinceRepository.GetById(id);
            return Ok(province);
        }

        [HttpPost]
        public IActionResult Create(Province province) 
        { 
            _provinceRepository.Create(province);
            return Ok(province);
        }
        [HttpPut("{id:int}")]
        public IActionResult Update([FromBody] Province province)
        {
            _provinceRepository.Update(province);
            return Ok(province);
        }

        [HttpGet]
        [Route("GetProvinceByCityId/{cityId:int}")]
        public IActionResult GetProvinceByCityId(int cityId) 
        {
            Province province = _provinceRepository.GetProvinceByCityId(cityId);
            return Ok(province);
        }
    }
}
