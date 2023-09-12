namespace SearchHire.WebAPI.Models
{
    public class AddUserModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime JoinDate { get; set; }
        public bool IsMasterUser { get; set; }
        public bool IsActive { get; set; }
        public int WorkDone { get; set; }
    }
}
