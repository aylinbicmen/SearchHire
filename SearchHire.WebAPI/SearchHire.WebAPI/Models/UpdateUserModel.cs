namespace SearchHire.WebAPI.Models
{
    public class UpdateUserModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int CityId { get; set; }
        public int SpecialtyId { get; set; }
    }
}
