module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: true
      },
      distribution: [
        {
          containerId: {
            type: String,
            required: true
          },
          parentId: String,
          things: [
            {
              thingId: String,
            }
          ]
        }
      ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Distribution = mongoose.model("distribution", schema);
  return Distribution;
};
