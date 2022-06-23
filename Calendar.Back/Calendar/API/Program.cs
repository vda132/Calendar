using DataAccess.Context;
using Logic.Logic;
using Microsoft.EntityFrameworkCore;
using Repository.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<CalendarContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("Connection"), 
        b => b.MigrationsAssembly("DataAccess")));

builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IEventLogic, EventLogic>();

var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ContactsBook v1"));
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthorization();

app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

app.Run();