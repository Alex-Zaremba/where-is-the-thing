
module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      volume: {
        type: Number,
        required: true,
        min: 1
      },
      things: [
        {
          type: mongoose.Schema.Types.ObjectID,
          ref: "thing"
        }
      ],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Container = mongoose.model("container", schema);
  return Container;
};
