using DataAccess.Context;
using Logic.Logic;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Repository.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Calendar", Version = "v1" });
});

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
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Calendar v1"));
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

app.Run();