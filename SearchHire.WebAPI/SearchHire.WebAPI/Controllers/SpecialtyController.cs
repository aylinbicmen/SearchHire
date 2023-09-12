using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SearchHire.Data.Entities;
using SearchHire.Data.Repositories;

namespace SearchHire.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialtyController : ControllerBase
    {
        private readonly ISpecialtyRepository _specialtyRepository;
        public SpecialtyController(ISpecialtyRepository _specialtyRepository) 
        { 
            this._specialtyRepository = _specialtyRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            List<Specialty> specialties = await _specialtyRepository.GetAllAsync();
            return Ok(specialties);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            Specialty specialty = _specialtyRepository.GetById(id);
            return Ok(specialty);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Specialty specialty)
        {
            _specialtyRepository.Create(specialty);
            return Ok(specialty);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update([FromBody] Specialty specialty)
        {
            _specialtyRepository.Update(specialty);
            return Ok(specialty);
        }
    }
}
