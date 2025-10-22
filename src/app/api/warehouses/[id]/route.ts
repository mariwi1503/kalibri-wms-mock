// import sql from "@/app/api/utils/sql";
import { warehouses } from "@/constant/warehouse";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: {params: {id: string}}) {
  try {
    const { id } = params;

    // const warehouses = await sql`
    //   SELECT w.*, u.full_name as owner_name, u.phone as owner_phone, u.email as owner_email
    //   FROM warehouses w
    //   LEFT JOIN users u ON w.owner_id = u.id
    //   WHERE w.id = ${id}
    // `;

    // if (warehouses.length === 0) {
    //   return Response.json({ error: "Warehouse not found" }, { status: 404 });
    // }

    const warehouse = warehouses.find(x => x.id === +id)

    return Response.json({ warehouse });

  } catch (error) {
    console.error("Get warehouse error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// export async function PUT(request, { params }) {
//   try {
//     const { id } = params;
//     const updateData = await request.json();

//     // Build dynamic update query
//     const allowedFields = [
//       'name', 'description', 'address', 'city', 'province', 'postal_code',
//       'size_sqm', 'price_per_month', 'facilities', 'images', 'status'
//     ];

//     const setClauses = [];
//     const values = [];
//     let paramCount = 0;

//     for (const [key, value] of Object.entries(updateData)) {
//       if (allowedFields.includes(key)) {
//         paramCount++;
//         setClauses.push(`${key} = $${paramCount}`);
//         values.push(value);
//       }
//     }

//     if (setClauses.length === 0) {
//       return Response.json({ error: "No valid fields to update" }, { status: 400 });
//     }

//     paramCount++;
//     values.push(new Date().toISOString());
//     setClauses.push(`updated_at = $${paramCount}`);

//     paramCount++;
//     values.push(id);

//     const query = `
//       UPDATE warehouses 
//       SET ${setClauses.join(', ')}
//       WHERE id = $${paramCount}
//       RETURNING *
//     `;

//     const result = await sql(query, values);

//     if (result.length === 0) {
//       return Response.json({ error: "Warehouse not found" }, { status: 404 });
//     }

//     return Response.json({ warehouse: result[0] });

//   } catch (error) {
//     console.error("Update warehouse error:", error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     const { id } = params;

//     // Check if warehouse has active rentals
//     const activeRentals = await sql`
//       SELECT id FROM rentals 
//       WHERE warehouse_id = ${id} AND status = 'active'
//     `;

//     if (activeRentals.length > 0) {
//       return Response.json({ 
//         error: "Cannot delete warehouse with active rentals" 
//       }, { status: 400 });
//     }

//     const result = await sql`
//       DELETE FROM warehouses 
//       WHERE id = ${id}
//       RETURNING id
//     `;

//     if (result.length === 0) {
//       return Response.json({ error: "Warehouse not found" }, { status: 404 });
//     }

//     return Response.json({ message: "Warehouse deleted successfully" });

//   } catch (error) {
//     console.error("Delete warehouse error:", error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }