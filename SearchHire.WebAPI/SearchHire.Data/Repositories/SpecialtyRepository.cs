using SearchHire.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Repositories
{
    public class SpecialtyRepository : ISpecialtyRepository
    {
        private readonly IGenericRepository<Specialty> _genericRepository;

        public SpecialtyRepository(IGenericRepository<Specialty> _genericRepository)
        {
            this._genericRepository = _genericRepository;
        }

        public void Create(Specialty entity)
        {
           _genericRepository.Create(entity);
        }

        public async Task<List<Specialty>> GetAllAsync()
        {
            return await _genericRepository.GetAllAsync();
        }

        public Specialty GetById(int id)
        {
            return _genericRepository.GetById(id);
        }

        public void Update(Specialty entity)
        {
            _genericRepository.Update(entity);
        }
    }
}
