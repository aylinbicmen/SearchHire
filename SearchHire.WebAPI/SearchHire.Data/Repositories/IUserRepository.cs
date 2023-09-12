using SearchHire.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<List<User>> GetAllMasterUsersBySpecialtyAndOrCityId(int specialtyId, int cityId = 0);
        String Login(string email, string password);
        void MasterUserWorkDone(int id);
        void UserSubscribe(string email);
    }
}
