using Microsoft.EntityFrameworkCore;
using SearchHire.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly IGenericRepository<Post> _genericRepository;
        private readonly SearchHireDbContext _context;
        public PostRepository(IGenericRepository<Post> _genericRepository, SearchHireDbContext _context)
        {
            this._genericRepository = _genericRepository;
            this._context = _context;
        }

        public void Create(Post entity)
        {
            _genericRepository.Create(entity);
        }

        public async Task<List<Post>> GetAllAsync()
        {
            return await _genericRepository.GetAllAsync();
        }

        public Post GetById(int id)
        {
            return _genericRepository.GetById(id);
        }

        public async Task<List<Post>> GetPostsByMasterUserId(int id)
        {
            return await _context.Posts.Where(p => p.MasterUserId == id).ToListAsync();
        }

        public async Task<List<Post>> GetPostsWithSearch(string searchData)
        {
            return await _context.Posts.Where(p => p.MasterUserId == 0 && p.Isactive == true && p.Title.Contains(searchData)).ToListAsync();
        }

        public async Task<List<Post>> GetPostsBySpecialtyId(int id)
        {
            return await _context.Posts.Where(p => p.MasterUserId == 0 && p.Isactive == true && p.SpecialtyId == id).ToListAsync();
        }

        public async Task<List<Post>> GetPostsByUserId(int id)
        {
            return await _context.Posts.Where(p => p.UserId == id).ToListAsync();
        }

        public void PostMasterUserIdUpdate(int postId, int masterUserId)
        {
            Post post = _context.Posts.Where(p => p.Id == postId).FirstOrDefault(); 
            post.MasterUserId = masterUserId;
            
            _context.SaveChanges();
        }

        public void Update(Post entity)
        {
            Post postToBeUpdated = _context.Posts.Where(p => p.Id == entity.Id).FirstOrDefault();

            postToBeUpdated.Title = entity.Title;
            postToBeUpdated.Description = entity.Description;
            postToBeUpdated.IsCompleted = entity.IsCompleted;
            postToBeUpdated.MasterUserId = entity.MasterUserId;
            postToBeUpdated.Isactive = entity.Isactive;

            _context.SaveChanges();
        }
    }
}
