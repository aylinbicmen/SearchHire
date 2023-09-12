namespace SearchHire.WebAPI.Models
{
    public class AddPostModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsActive { get; set; }
        public int UserId { get; set; }
        public int SpecialtyId { get; set; }
        public int MasterUserId { get; set; }
    }
}
