const ProductResponseDto = {
  $id: "string",
  $name: "string",
  $description: "string",
  $choices: [
    {
      $ref: "#/components/schemas/ChoiceResponseDto",
    },
  ],
  $images: ["string"],
  $price: 10,
  $published_at: "string",
};

export default ProductResponseDto;
