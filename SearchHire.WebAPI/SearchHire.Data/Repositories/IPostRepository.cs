using SearchHire.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Repositories
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        Task<List<Post>> GetPostsByUserId(int id);
        Task<List<Post>> GetPostsByMasterUserId(int id);
        Task<List<Post>> GetPostsBySpecialtyId(int id);
        Task<List<Post>> GetPostsWithSearch(string searchData);
        void PostMasterUserIdUpdate(int postId, int masterUserId);
    }
}
