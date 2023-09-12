using Microsoft.EntityFrameworkCore;
using SearchHire.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly SearchHireDbContext _context;
        private readonly DbSet<T> _table;

        public GenericRepository(SearchHireDbContext _context)
        {
            this._context = _context;
            _table = _context.Set<T>();
        }

        public void Create(T entity)
        {
            _table.Add(entity);
            _context.SaveChanges();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _table.ToListAsync();
        }

        public T GetById(int id)
        {
            return _table.Find(id);
        }

        public void Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
