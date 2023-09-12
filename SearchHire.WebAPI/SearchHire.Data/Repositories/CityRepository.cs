using Microsoft.EntityFrameworkCore;
using SearchHire.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly IGenericRepository<City> _genericRepository;
        private readonly SearchHireDbContext _context;

        public CityRepository(IGenericRepository<City> _genericRepository, SearchHireDbContext _context)
        {
            this._genericRepository = _genericRepository;
            this._context = _context;
        }

        public void Create(City entity)
        {
            _genericRepository.Create(entity);
        }

        public async Task<List<City>> GetAllAsync()
        {
            return await _genericRepository.GetAllAsync();
        }

        public City GetById(int id)
        {
            return _genericRepository.GetById(id);
        }

        public async Task<List<City>> GetCitiesByProvince(int provinceId)
        {
            return await _context.Cities.Where(c => c.ProvinceId == provinceId).ToListAsync();
        }

        public void Update(City entity)
        {
            _genericRepository.Update(entity);
        }
    }
}
