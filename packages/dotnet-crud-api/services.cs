using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace PracticeData
{
  public class PracticeDbContext : DbContext
  {
    public DbSet<Practice> Practices { get; set; }

    public DbSet<FormStructureConfig> FormStructures { get; set; }
    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
      PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
      // PropertyNameCaseInsensitive = true is the default for deserializing,
      // so we don't strictly need it, but this is a robust setup.
      PropertyNameCaseInsensitive = true
    };

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=practice.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Practice>(eb =>
      {
        eb.HasKey(p => p.Id);

        eb.OwnsOne(p => p.Person, personBuilder =>
              {
                personBuilder.OwnsOne(p => p.Family);
              });

        eb.OwnsOne(p => p.Place, placeBuilder =>
              {
                placeBuilder.OwnsOne(p => p.Car);
              });
      });

      // --- FIXED ENTITY CONFIGURATION ---
      modelBuilder.Entity<FormStructureConfig>(eb =>
      {
        eb.HasKey(fs => fs.Id);

        // This tells EF Core to use System.Text.Json to serialize/deserialize
        // the 'Shape' object into a single string (TEXT) column.
        // This is a robust method that avoids the .ToJson() extension.
        eb.Property(fs => fs.Shape).HasConversion(
                  // To the database (serialize)
                  v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                  // From the database (deserialize)
                  v => JsonSerializer.Deserialize<FormStructure>(v, (JsonSerializerOptions)null)
              );
      });
    }
  }
  public class PracticeService
  {
    // For a bare-minimum app, we're not using Dependency Injection.
    // We'll create a new context for each operation.
    private PracticeDbContext CreateContext()
    {
      var context = new PracticeDbContext();
      // This ensures the database and tables are created
      context.Database.EnsureCreated();
      return context;
    }

    // --- Practice Methods ---

    // GET All
    public async Task<List<Practice>> GetPractices()
    {
      await using var context = CreateContext();

      // We must use AsNoTracking when reading lists with owned entities
      // if we are disposing the context right after.
      // For simplicity in this bare-bones app, we'll just load them.
      return await context.Practices.ToListAsync();
    }

    // GET by ID
    public async Task<Practice?> GetPractice(int id)
    {
      await using var context = CreateContext();

      // FindAsync is not ideal for owned entities without tracking.
      // FirstOrDefaultAsync is more reliable here.
      return await context.Practices
          .FirstOrDefaultAsync(p => p.Id == id);
    }

    // POST (Create)
    public async Task<Practice> CreatePractice(Practice practice)
    {
      await using var context = CreateContext();

      context.Practices.Add(practice);
      await context.SaveChangesAsync();
      return practice;
    }

    // PUT (Update)
    public async Task<Practice?> UpdatePractice(int id, Practice updatedPractice)
    {
      await using var context = CreateContext();

      var existingPractice = await context.Practices
          .FirstOrDefaultAsync(p => p.Id == id);

      if (existingPractice == null)
      {
        return null; // Not found
      }

      // Update the owned entities
      existingPractice.Person = updatedPractice.Person;
      existingPractice.Place = updatedPractice.Place;

      // Mark the main entity as modified (though EF tracking should handle this)
      context.Entry(existingPractice).State = EntityState.Modified;

      await context.SaveChangesAsync();
      return existingPractice;
    }

    // DELETE
    public async Task<bool> DeletePractice(int id)
    {
      await using var context = CreateContext();

      var practice = await context.Practices
          .FirstOrDefaultAsync(p => p.Id == id);

      if (practice == null)
      {
        return false; // Not found
      }

      context.Practices.Remove(practice);
      await context.SaveChangesAsync();
      return true;
    }

    // --- UPDATED FormStructure Methods ---

    // GET Form Structure
    // Returns the deserialized C# object
    public async Task<FormStructure?> GetFormStructure()
    {
      await using var context = CreateContext();
      var config = await context.FormStructures.FirstOrDefaultAsync();
      return config?.Shape; // Return the C# object itself
    }

    // Create Form Structure (for seeding)
    public async Task CreateFormStructure(FormStructureConfig config)
    {
      await using var context = CreateContext();
      context.FormStructures.Add(config);
      await context.SaveChangesAsync();
    }

    // Check if Form Structure exists (for seeding)
    public async Task<int> GetFormStructureCount()
    {
      await using var context = CreateContext();
      return await context.FormStructures.CountAsync();
    }
  }
}