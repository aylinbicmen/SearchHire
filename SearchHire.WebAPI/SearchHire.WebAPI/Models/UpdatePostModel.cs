namespace SearchHire.WebAPI.Models
{
    public class UpdatePostModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public int MasterUserId { get; set; }
        public bool Isactive { get; set; }
    }
}
