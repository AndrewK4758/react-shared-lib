namespace PracticeData
{

  public class NewSection {
  public int Id {get;set;}
  public required string One {get; set;}
  public required string Two {get; set;}
  public required string Three {get; set;}
  }

  public class Practice
  {
    public int Id { get; set; }
    public required Person Person { get; set; }
    public required Place Place { get; set; }
  }

  public class Person
  {
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Nickname { get; set; }
    public required string FavoriteColor { get; set; }
    public required Family Family { get; set; }
  }

  public class Family
  {
    public required string Mom { get; set; }
    public required string Dad { get; set; }
    public required string Bro { get; set; }
    public required string Sis { get; set; }
  }

  public class Car
  {
    public required string Make { get; set; }
    public required string Model { get; set; }
  }

  public class Place
  {
    public required string Address { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public required string Zip { get; set; }
    public required Car Car { get; set; }
  }

  // --- Form Structure Classes (NEW) ---
  // These classes represent the C# version of your JSON structure

  public class FieldConfig
  {
    // --- UPDATED ---
    public required string type { get; set; }
    public required int TypeId { get; set; } // 1 = text, 2 = dropdown
                                             // --- END UPDATE ---
  }

  public class CarForm
  {
    public required FieldConfig make { get; set; }
    public required FieldConfig model { get; set; }
    public required FieldConfig type { get; set; }
  }

  public class PlaceForm
  {
    public required FieldConfig address { get; set; }
    public required FieldConfig city { get; set; }
    public required FieldConfig state { get; set; }
    public required FieldConfig zip { get; set; }
    public required CarForm car { get; set; }
  }

  public class FamilyForm
  {
    public required FieldConfig mom { get; set; }
    public required FieldConfig dad { get; set; }
    public required FieldConfig bro { get; set; }
    public required FieldConfig sis { get; set; }
  }

  public class PersonForm
  {
    public required FieldConfig id { get; set; }
    public required FieldConfig name { get; set; }
    public required FieldConfig nickname { get; set; }
    public required FieldConfig favoriteColor { get; set; }
    public required FamilyForm family { get; set; }
  }

  public class NewSectionForm
  {
    public required FieldConfig one { get; set; }
    public required FieldConfig two { get; set; }
    public required FieldConfig three { get; set; }
  }

  public class FormStructure
  {
    public required NewSectionForm newSection { get; set; }
    public required PersonForm person { get; set; }
    public required PlaceForm place { get; set; }
  }


  // --- UPDATED CLASS ---
  // Represents the new table to hold the UI form structure
  public class FormStructureConfig
  {
    public int Id { get; set; }

    // This will store the C# object as a JSON string in the database
    public required FormStructure Shape { get; set; }
  }
}