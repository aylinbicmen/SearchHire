using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SearchHire.Data.Entities;
using SearchHire.Data.Repositories;
using SearchHire.WebAPI.Models;

namespace SearchHire.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository _postRepository)
        {
            this._postRepository = _postRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            List<Post> posts = await _postRepository.GetAllAsync();
            return Ok(posts);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id) 
        {
            Post post = _postRepository.GetById(id);
            return Ok(post);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AddPostModel post) 
        {
            _postRepository.Create(new Post { Title = post.Title,Description = post.Description, CreatedDate = post.CreatedDate, IsCompleted = post.IsCompleted, UserId = post.UserId, SpecialtyId = post.SpecialtyId, MasterUserId = post.MasterUserId, Isactive = post.IsActive});
            return Ok(post);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update([FromBody] UpdatePostModel post) 
        {
            _postRepository.Update(new Post { Id=post.Id,Title=post.Title,Description=post.Description,IsCompleted=post.IsCompleted,MasterUserId=post.MasterUserId,Isactive=post.Isactive});
            return Ok(post);
        }

        [HttpGet]
        [Route("GetPostsByMasterUserId/{id:int}")]
        public async Task<IActionResult> GetPostsByMasterUserId(int id)
        {
            List<Post> posts = await _postRepository.GetPostsByMasterUserId(id);
            return Ok(posts);
        }

        [HttpGet]
        [Route("GetPostsByUserId/{id:int}")]
        public async Task<IActionResult> GetPostsByUserId(int id)
        {
            List<Post> posts = await _postRepository.GetPostsByUserId(id);
            return Ok(posts);
        }

        [HttpGet]
        [Route("GetPostsBySpecialtyId/{id:int}")]
        public async Task<IActionResult> GetPostsBySpecialtyId(int id)
        {
            List<Post> posts = await _postRepository.GetPostsBySpecialtyId(id);
            return Ok(posts);
        }

        [HttpPut]
        [Route("PostMasterUserIdUpdate/{postId:int}/{masterUserId:int}")]
        public IActionResult PostMasterUserIdUpdate(int postId, int masterUserId)
        {
            _postRepository.PostMasterUserIdUpdate(postId, masterUserId);
            return Ok();
        }

        [HttpGet]
        [Route("GetPostsWithSearch/{searchData}")]
        public async Task<IActionResult> GetPostsWithSearch(string searchData)
        {
            List<Post> posts = await _postRepository.GetPostsWithSearch(searchData);
            return Ok(posts);
        }
    }
}
