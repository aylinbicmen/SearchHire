using Microsoft.EntityFrameworkCore;
using SearchHire.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Repositories
{
    public class ProvinceRepository : IProvinceRepository
    {
        private readonly IGenericRepository<Province> _genericRepository;
        private readonly SearchHireDbContext _context;
        public ProvinceRepository(IGenericRepository<Province> _genericRepository, SearchHireDbContext _context)
        {
            this._genericRepository = _genericRepository;
            this._context = _context;
        }

        public void Create(Province entity)
        {
            _genericRepository.Create(entity);
        }

        public async Task<List<Province>> GetAllAsync()
        {
            return await _genericRepository.GetAllAsync();
        }

        public Province GetById(int id)
        {
            return _genericRepository.GetById(id);
        }

        public Province GetProvinceByCityId(int cityId)
        {
             int pId =_context.Cities.Where(c => c.Id == cityId).Select(p => p.ProvinceId).FirstOrDefault();

            return _context.Province.Where(p => p.Id == pId).FirstOrDefault();
        }

        public void Update(Province entity)
        {
            _genericRepository.Update(entity);
        }
    }
}
