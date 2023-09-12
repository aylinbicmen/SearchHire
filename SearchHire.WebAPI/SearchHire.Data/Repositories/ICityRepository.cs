using SearchHire.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Repositories
{
    public interface ICityRepository : IGenericRepository<City>
    {
        Task<List<City>> GetCitiesByProvince(int provinceId);
    }
}
