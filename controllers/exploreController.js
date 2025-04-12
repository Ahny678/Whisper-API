const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");

exports.search = async (req, res) => {
  const { q, category, sort } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  let whereClause = `"isPublished" = true`;
  let orderClause = "";
  let replacements = {};

  // Build WHERE clause only if there's a search query
  if (q) {
    whereClause += ` AND "searchVector" @@ plainto_tsquery('english', :q)`;
    replacements.q = q;
  }
  if (category) {
    whereClause += ` AND "category" = :category`;
    replacements.category = category;
  }

  if (category) {
    whereClause += ` AND "category" = :category`;
  }

  // Handle sorting
  switch (sort) {
    case "views":
      orderClause = `"views" DESC`;
      break;
    case "likes":
      orderClause = `"likes" DESC`;
      break;
    case "newest":
      orderClause = `"publishedAt" DESC`;
      break;
    case "oldest":
      orderClause = `"publishedAt" ASC`;
      break;
    default:
      // Default to relevance if there's a query, else newest
      orderClause = q
        ? `ts_rank("searchVector", plainto_tsquery('english', :q)) DESC`
        : `"publishedAt" DESC`;
      break;
  }
  try {
    // Get total count
    const countResult = await sequelize.query(
      `
          SELECT COUNT(*) FROM "Posts"
          WHERE ${whereClause}
          `,
      {
        replacements,
        type: QueryTypes.SELECT,
      }
    );

    const totalItems = parseInt(countResult[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    // Get paginated results
    const posts = await sequelize.query(
      `
          SELECT * FROM "Posts"
          WHERE ${whereClause}
          ORDER BY ${orderClause}
          LIMIT :limit OFFSET :offset
          `,
      {
        replacements: { ...replacements, limit, offset },
        type: QueryTypes.SELECT,
      }
    );

    const results = {
      totalItems,
      totalPages,
      currentPage: page,
      pageSize: limit,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      data: posts,
    };
    res.status(200).json(results);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.trending = () => {
  try {
  } catch (err) {}
};
