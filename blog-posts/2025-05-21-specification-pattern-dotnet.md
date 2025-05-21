# Clean Filtering in .NET – Specification Pattern

Sometimes I don’t want to shove filtering logic all over the place — not in my controllers, not in services, and especially not tangled inside repositories. That’s where the **Specification Pattern** steps in. It gives you a clean, reusable way to describe business rules or queries.

In this post, I’ll show two ways to use it in .NET:
1. A simple custom implementation
2. The proper way with [Ardalis.Specification](https://github.com/ardalis/Specification)

---

## ✅ What Is the Specification Pattern?

At the core, it's just a way to encapsulate logic like "only active customers" or "customers with more than 5 orders" into reusable, composable objects. No more repeating where-clauses all over your app.

---

## 🧠 Why It Helps in Domain-Driven Design

In DDD, we want business rules and logic to live in the **Domain Layer** — not scattered through services or EF Core queries.

Specifications help you do exactly that:

- You define **business criteria** as objects.
- You can test and reuse them without pulling in EF Core.
- Your **domain model stays focused** and lean.

Instead of this:

```csharp
var customers = _db.Customers.Where(c => c.IsActive && c.Orders.Count > 3).ToList();
```

You do this:

```csharp
var spec = new ActiveCustomerWithMinOrdersSpecification(3);
var customers = _repo.ListAsync(spec);
```

That means logic is **centralized and intention-revealing**. Way easier to maintain and reason about.

---

## 💡 Custom Specification – The Basics

Let’s build a minimal version ourselves.

### Base Specification

```csharp
public abstract class Specification<T>
{
    public abstract Expression<Func<T, bool>> ToExpression();

    public Func<T, bool> ToPredicate() => ToExpression().Compile();

    public bool IsSatisfiedBy(T entity) => ToPredicate()(entity);

    public Specification<T> And(Specification<T> other) => new AndSpecification<T>(this, other);
    public Specification<T> Or(Specification<T> other) => new OrSpecification<T>(this, other);
}
```

### `AndSpecification<T>` + `OrSpecification<T>`

```csharp
public class AndSpecification<T> : Specification<T>
{
    private readonly Specification<T> _left, _right;

    public AndSpecification(Specification<T> left, Specification<T> right)
    {
        _left = left;
        _right = right;
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        var param = Expression.Parameter(typeof(T));
        var body = Expression.AndAlso(
            Expression.Invoke(_left.ToExpression(), param),
            Expression.Invoke(_right.ToExpression(), param));

        return Expression.Lambda<Func<T, bool>>(body, param);
    }
}

public class OrSpecification<T> : Specification<T>
{
    private readonly Specification<T> _left, _right;

    public OrSpecification(Specification<T> left, Specification<T> right)
    {
        _left = left;
        _right = right;
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        var param = Expression.Parameter(typeof(T));
        var body = Expression.OrElse(
            Expression.Invoke(_left.ToExpression(), param),
            Expression.Invoke(_right.ToExpression(), param));

        return Expression.Lambda<Func<T, bool>>(body, param);
    }
}
```

### Example: Active Customer Spec with Param

```csharp
public class CustomerWithMinimumOrdersSpecification : Specification<Customer>
{
    private readonly int _minOrders;

    public CustomerWithMinimumOrdersSpecification(int minOrders)
    {
        _minOrders = minOrders;
    }

    public override Expression<Func<Customer, bool>> ToExpression()
    {
        return customer => customer.Orders.Count >= _minOrders;
    }
}
```

### Using It

```csharp
var spec = new CustomerWithMinimumOrdersSpecification(3);

if (spec.IsSatisfiedBy(customer)) {
    // this customer matches spec
}
```

Or use it in LINQ:

```csharp
var result = dbContext.Customers
    .Where(spec.ToExpression())
    .ToList();
```

You can also combine them:

```csharp
var spec = new ActiveCustomerSpecification()
    .And(new CustomerWithMinimumOrdersSpecification(5));

bool matches = spec.IsSatisfiedBy(customer);
```

---

## 🧰 Using Ardalis.Specification

If you want all this but ready-to-go, composable, with EF Core integration — then just use [Ardalis.Specification](https://github.com/ardalis/Specification).

### Step 1: Install

```bash
dotnet add package Ardalis.Specification
dotnet add package Ardalis.Specification.EntityFrameworkCore
```

### Step 2: Define a Spec

```csharp
public class ActiveCustomerWithMinOrdersSpec : Specification<Customer>
{
    public ActiveCustomerWithMinOrdersSpec(int minOrders)
    {
        Query.Where(c => c.IsActive && c.Orders.Count >= minOrders)
             .Include(c => c.Orders); // optional include
    }
}
```

### Step 3: Use It

```csharp
var spec = new ActiveCustomerWithMinOrdersSpec(3);
var customers = await customerRepo.ListAsync(spec);
```

---

## 🧱 Repository Pattern (Basic Idea)

You can combine this easily with a generic repository.

```csharp
public interface IRepository<T> where T : class
{
    Task<List<T>> ListAsync(ISpecification<T> spec);
    Task<T?> GetByIdAsync(int id);
    Task AddAsync(T entity);
}
```

Usage inside a service:

```csharp
public class CustomerService
{
    private readonly IRepository<Customer> _repo;

    public CustomerService(IRepository<Customer> repo)
    {
        _repo = repo;
    }

    public Task<List<Customer>> GetQualifiedCustomers()
    {
        var spec = new ActiveCustomerWithMinOrdersSpec(5);
        return _repo.ListAsync(spec);
    }
}
```

That’s it. You hide EF Core, plug in specs, and your code becomes way more expressive.

---

## ✨ Bonus: When to Use `IsSatisfiedBy`

With custom specs, you can check things in-memory:

```csharp
var spec = new CustomerWithMinimumOrdersSpecification(2);
bool isOk = spec.IsSatisfiedBy(someCustomer); // handy for testing or validation
```

Not ideal for filtering large lists — use `.ToExpression()` and `Where()` for that.

---

## 🧼 Summary

- ✅ Use the Specification pattern to clean up filtering logic
- 🛠 Write your own if you want control
- 🧠 Use Ardalis.Specification if you want power and simplicity
- 📦 Works great with Domain-Driven Design by keeping business rules out of the infrastructure and in your domain logic

In the end, it’s all about putting logic in the right place. And specs help you **stop repeating yourself** across repositories, services, and queries.