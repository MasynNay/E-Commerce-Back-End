const router = require("express").Router();
const { Tag, Product } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!tagData) {
      res.status(404).json({ message: "There are no tags with that ID!" });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData)
  } catch (err) {
      res.status(500).json(err)
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!tagData) {
      res.status(404).json ({ message: "That tag was not found. Please try another ID."})
      return;
    }
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;