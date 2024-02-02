const ProductsAllResponseDto = [
  {
    $id: "string",
    $name: "string",
    $choices: [
      {
        $ref: "#/components/schemas/ChoiceResponseDto",
      },
    ],
    $images: ["string"],
    $price: 10,
    $published_at: "string",
  },
];

export default ProductsAllResponseDto;
