using System; // Added for Console.WriteLine
using System.Threading.Tasks; // Added for Task
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using PracticeData;

var builder = WebApplication.CreateBuilder(args);

// Register the PracticeService as a singleton.
// Since PracticeService creates its own DbContext,
// this is the simplest way to make it available.
builder.Services.AddSingleton<PracticeService>();

// --- SIMPLIFIED CORS SERVICES (UPDATED) ---
// Just add the core CORS services.
builder.Services.AddCors();
// --- END NEW ---

var app = builder.Build();

// --- ENABLE CORS (UPDATED) ---
// We will build the policy directly here instead of using a named policy.
// This must be called before the Map... endpoints.
app.UseCors(policy =>
{
  policy.AllowAnyOrigin() // Allow any domain (perfect for local dev)
        .AllowAnyHeader() // Allow any headers in the request
        .AllowAnyMethod(); // Allow all HTTP methods (GET, POST, PUT, etc.)
});
// --- END NEW ---


// --- SEED DATABASE WITH TEST DATA ---
// We'll do this once on startup
// We create a scope to get the service
using (var scope = app.Services.CreateScope())
{
  var service = scope.ServiceProvider.GetRequiredService<PracticeService>();
  // We run the seeding method (and wait for it to finish)
  await SeedDatabase(service);
}


// --- Map CRUD Routes ---

// GET /practices
app.MapGet("/practices", async (PracticeService service) =>
{
  var practices = await service.GetPractices();
  return Results.Ok(practices);
});

// GET /practices/{id}
app.MapGet("/practices/{id}", async (int id, PracticeService service) =>
{
  var practice = await service.GetPractice(id);

  return practice != null
      ? Results.Ok(practice)
      : Results.NotFound($"Practice with id {id} not found.");
});

// POST /practices
app.MapPost("/practices", async (Practice practice, PracticeService service) =>
{
  var createdPractice = await service.CreatePractice(practice);

  // Return a 201 Created response, pointing to the new resource's URL
  return Results.Created($"/practices/{createdPractice.Id}", createdPractice);
});

// PUT /practices/{id}
app.MapPut("/practices/{id}", async (int id, Practice practice, PracticeService service) =>
{
  // ... existingcode ...
});

// DELETE /practices/{id}
app.MapDelete("/practices/{id}", async (int id, PracticeService service) =>
{
  var success = await service.DeletePractice(id);

  return success
      ? Results.NoContent() // 204 No Content is standard for a successful delete
      : Results.NotFound($"Practice with id {id} not found.");
});

// --- UPDATED ENDPOINT ---
// GET /form-structure
app.MapGet("/form-structure", async (PracticeService service) =>
{
  // The service now returns the C# object
  var structureObject = await service.GetFormStructure();

  return structureObject != null
      // ASP.NET Core will automatically serialize this object to JSON
      ? Results.Ok(structureObject)
      : Results.NotFound("Form structure not found.");
});


// Run the application on port 4201
app.Run("http://localhost:4201");


// --- Seeding Method ---
static async Task SeedDatabase(PracticeService service)
{
  // Check if data already exists
  var practices = await service.GetPractices();
  if (practices.Count == 0)
  {
    Console.WriteLine("No data found. Seeding database...");

    var practice1 = new Practice
    {
      Person = new Person
      {
        Id = "p-001",
        Name = "John Doe",
        Nickname = "Johnny",
        FavoriteColor = "Blue",
        Family = new Family { Mom = "Jane Doe", Dad = "Richard Doe", Bro = "Jake Doe", Sis = "Jenny Doe" }
      },
      Place = new Place
      {
        Address = "123 Main St",
        City = "Anytown",
        State = "CA",
        Zip = "12345",
        Car = new Car { Make = "Honda", Model = "Civic" }
      }
    };

    var practice2 = new Practice
    {
      Person = new Person
      {
        Id = "p-002",
        Name = "Alice Smith",
        Nickname = "Al",
        FavoriteColor = "Green",
        Family = new Family { Mom = "Mary Smith", Dad = "Tom Smith", Bro = "N/A", Sis = "Lucy Smith" }
      },
      Place = new Place
      {
        Address = "456 Oak Ave",
        City = "Otherville",
        State = "NY",
        Zip = "54321",
        Car = new Car { Make = "Tesla", Model = "Model 3" }
      }
    };

    // --- NEW DATA ---
    var practice3 = new Practice
    {
      Person = new Person
      {
        Id = "p-003",
        Name = "Bruce Wayne",
        Nickname = "Batman",
        FavoriteColor = "Black",
        Family = new Family { Mom = "Martha Wayne", Dad = "Thomas Wayne", Bro = "N/A", Sis = "N/A" }
      },
      Place = new Place
      {
        Address = "1007 Mountain Drive",
        City = "Gotham",
        State = "NJ",
        Zip = "07001",
        Car = new Car { Make = "Lamborghini", Model = "Murciélago" }
      }
    };

    var practice4 = new Practice
    {
      Person = new Person
      {
        Id = "p-004",
        Name = "Clark Kent",
        Nickname = "Supes",
        FavoriteColor = "Red",
        Family = new Family { Mom = "Martha Kent", Dad = "Jonathan Kent", Bro = "N/A", Sis = "N/A" }
      },
      Place = new Place
      {
        Address = "344 Clinton St, Apt 3B",
        City = "Metropolis",
        State = "NY",
        Zip = "10002",
        Car = new Car { Make = "Ford", Model = "Sedan (vintage)" }
      }
    };

    var practice5 = new Practice
    {
      Person = new Person
      {
        Id = "p-005",
        Name = "Diana Prince",
        Nickname = "Wonder Woman",
        FavoriteColor = "Gold",
        Family = new Family { Mom = "Hippolyta", Dad = "Zeus", Bro = "N/A", Sis = "N/A" }
      },
      Place = new Place
      {
        Address = "1 Gateway Plaza",
        City = "Washington, D.C.",
        State = "DC",
        Zip = "20001",
        Car = new Car { Make = "N/A", Model = "Invisible Jet" }
      }
    };
    // --- END NEW DATA ---

    await service.CreatePractice(practice1);
    await service.CreatePractice(practice2);
    // --- ADD NEW DATA TO DB ---
    await service.CreatePractice(practice3);
    await service.CreatePractice(practice4);
    await service.CreatePractice(practice5);

    Console.WriteLine("Database seeded with 5 records."); // Updated count
  }
  else
  {
    Console.WriteLine($"{practices.Count} records found. Database already seeded.");
  }

  // --- UPDATED SEEDING LOGIC ---
  // Check if form structure already exists
  if (await service.GetFormStructureCount() == 0)
  {
    Console.WriteLine("No form structure found. Seeding form structure...");

    // --- UPDATED OBJECT ---
    // Create the C# object directly
    var formStructure = new FormStructure
    {
      newSection = new NewSectionForm
      {
        one = new FieldConfig { TypeId = 1, type = "text" }, // text
        two = new FieldConfig { TypeId = 1, type = "text" }, // text
        three = new FieldConfig { TypeId = 1, type = "text" } // text
      },
      person = new PersonForm
      {
        id = new FieldConfig { TypeId = 1, type = "text" }, // text
        name = new FieldConfig { TypeId = 1, type = "text" }, // text
        nickname = new FieldConfig { TypeId = 1, type = "text" }, // text
        favoriteColor = new FieldConfig { TypeId = 2, type = "dropdown" }, // dropdown
        family = new FamilyForm
        {
          mom = new FieldConfig { TypeId = 1, type = "text" }, // text
          dad = new FieldConfig { TypeId = 1, type = "text" }, // text
          bro = new FieldConfig { TypeId = 1, type = "text" }, // text
          sis = new FieldConfig { TypeId = 1, type = "text" } // text
        }
      },
      place = new PlaceForm
      {
        address = new FieldConfig { TypeId = 1, type = "text" }, // text
        city = new FieldConfig { TypeId = 1, type = "text" }, // text
        state = new FieldConfig { TypeId = 2, type = "dropdown" }, // dropdown
        zip = new FieldConfig { TypeId = 1, type = "text" }, // text
        car = new CarForm
        {
          make = new FieldConfig { TypeId = 2, type = "dropdown" }, // dropdown
          model = new FieldConfig { TypeId = 2, type = "dropdown" }, // dropdown
          type = new FieldConfig { TypeId = 1, type = "text" } // text
        }
      }
    };
    // --- END UPDATE ---

    var newConfig = new FormStructureConfig
    {
      Shape = formStructure // Assign the C# object
    };

    await service.CreateFormStructure(newConfig);
    Console.WriteLine("Form structure seeded.");
  }
}