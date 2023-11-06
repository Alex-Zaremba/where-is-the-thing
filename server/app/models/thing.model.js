module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      volume: {
        type: Number,
        required: true,
        min: 1
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.pre('save', () => console.log('Hello from pre save'));

  const Thing = mongoose.model("thing", schema);
  return Thing;
};
