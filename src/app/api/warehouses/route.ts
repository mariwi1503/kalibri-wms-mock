// import sql from "@/app/api/utils/sql";
import { warehouses } from "@/constant/warehouse";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // const { searchParams } = new URL(request.url);
    // const city = searchParams.get('city');
    // const minSize = searchParams.get('minSize');
    // const maxSize = searchParams.get('maxSize');
    // const minPrice = searchParams.get('minPrice');
    // const maxPrice = searchParams.get('maxPrice');
    // const status = searchParams.get('status') || 'available';

    // let query = `
    //   SELECT w.*, u.full_name as owner_name, u.phone as owner_phone
    //   FROM warehouses w
    //   LEFT JOIN users u ON w.owner_id = u.id
    //   WHERE w.status = $1
    // `;
    // let params = [status];
    // let paramCount = 1;

    // if (city) {
    //   paramCount++;
    //   query += ` AND LOWER(w.city) LIKE LOWER($${paramCount})`;
    //   params.push(`%${city}%`);
    // }

    // if (minSize) {
    //   paramCount++;
    //   query += ` AND w.size_sqm >= $${paramCount}`;
    //   params.push(parseInt(minSize));
    // }

    // if (maxSize) {
    //   paramCount++;
    //   query += ` AND w.size_sqm <= $${paramCount}`;
    //   params.push(parseInt(maxSize));
    // }

    // if (minPrice) {
    //   paramCount++;
    //   query += ` AND w.price_per_month >= $${paramCount}`;
    //   params.push(parseFloat(minPrice));
    // }

    // if (maxPrice) {
    //   paramCount++;
    //   query += ` AND w.price_per_month <= $${paramCount}`;
    //   params.push(parseFloat(maxPrice));
    // }

    // query += ` ORDER BY w.created_at DESC`;

    // const warehouses = await sql(query, params);
    // const warehouses = await sql(query, params);

    return Response.json({ warehouses });

  } catch (error) {
    console.error("Get warehouses error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const {
//       name,
//       description,
//       address,
//       city,
//       province,
//       postal_code,
//       size_sqm,
//       price_per_month,
//       facilities,
//       images,
//       owner_id
//     } = await request.json();

//     if (!name || !address || !city || !province || !size_sqm || !price_per_month || !owner_id) {
//       return Response.json({ error: "Required fields are missing" }, { status: 400 });
//     }

//     const result = await sql`
//       INSERT INTO warehouses (
//         name, description, address, city, province, postal_code,
//         size_sqm, price_per_month, facilities, images, owner_id
//       ) VALUES (
//         ${name}, ${description}, ${address}, ${city}, ${province}, ${postal_code},
//         ${size_sqm}, ${price_per_month}, ${facilities || []}, ${images || []}, ${owner_id}
//       ) RETURNING *
//     `;

//     return Response.json({ warehouse: result[0] }, { status: 201 });

//   } catch (error) {
//     console.error("Create warehouse error:", error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }