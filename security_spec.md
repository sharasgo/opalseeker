# Security Specification for Opal Seeker

## Data Invariants
- **Products**: Must have a valid name, type, origin, and positive price/weight. Only authorized administrative users (admins) can create, update, or delete products.
- **Orders**: Must have customer details, a list of items, and a total price. Anyone can create an order (guest checkout), but only admins can list or update them.

## The Dirty Dozen Payloads

### Product Attacks (Unauthorized Write)
1. **Unauthenticated Create**: Attempt to create a document in `products` as a guest.
   - Response: `PERMISSION_DENIED`
2. **Unauthorized Update**: Attempt to update a product price as a signed-in non-admin user.
   - Response: `PERMISSION_DENIED`
3. **Ghost Field Update**: Attempt to add `isVerified: true` to a product.
   - Response: `PERMISSION_DENIED`
4. **Invalid Type Write**: Attempt to set `priceAud` to a string.
   - Response: `PERMISSION_DENIED`
5. **ID Poisoning**: Attempt to use `../poison` as a product ID.
   - Response: `PERMISSION_DENIED`

### Order Attacks (Information Leak & State Corruption)
6. **Public Order List**: Attempt to read all documents in `orders` as a guest.
   - Response: `PERMISSION_DENIED`
7. **Order Hijacking**: Attempt to update an order status as a guest.
   - Response: `PERMISSION_DENIED`
8. **Owner Spoofing**: Attempt to set `customerEmail` in an order to the admin's email during guest update.
   - Response: `PERMISSION_DENIED`
9. **Zero-Item Order**: Attempt to create an order with an empty `items` list.
   - Response: `PERMISSION_DENIED`
10. **Admin Privilege Escalation**: Attempt to write to the `admins` collection as a guest.
    - Response: `PERMISSION_DENIED`
11. **Negative Price Order**: Attempt to create an order with a negative `totalAud`.
    - Response: `PERMISSION_DENIED`
12. **Terminal State Lock Bypass**: Attempt to move an order from "Delivered & Verified" back to "Pending Delivery".
    - Response: `PERMISSION_DENIED`

## Test Preview (Logic Overview)
- `isValidProduct(data)`: Checks for `name`, `type`, `origin`, `weight`, `priceAud`. Enforces type and size.
- `isValidOrder(data)`: Checks for `customerEmail`, `items`, `totalAud`.
- `isAdmin()`: Checks `exists(/databases/$(database)/documents/admins/$(request.auth.uid))` OR email matches.
- Base Rules:
  - `products`: Read: all. Write: `isAdmin()`.
  - `orders`: Create: all (with validation). Read/Update/Delete: `isAdmin()`.
  - `admins`: Read/Write: none (server-side only or pre-provisioned).
