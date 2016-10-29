// imitate getting json from server
app.factory('ArticlePreviews', () => {
	return {
		get() {
			return [
				{
					"id": 100,
					"tags": ["Make-up"],
					"header": "Road testing 12 different shades of orange lipstick in search of the best",
					"previewText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, doloribus!",
					"img": "article1.png",
					"author" : "Lorena Max"
				},
				{
					"id": 102,
					"tags": ["Make-up"],
					"header": "Kylie Jenner's new lip kit color, majesty, is a 'Black Metal Nature'",
					"previewText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptatibus, provident sunt, sequi unde quaerat.",
					"img": "article2.png",
					"author" : "Lorena Max"
				},
				{
					"id": 103,
					"tags": ["Make-up"],
					"header": "9 legit lip plumpers that actually do the job",
					"previewText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptatibus, provident sunt.",
					"img": "article1.png",
					"author" : "Lorena Max"
				}
			];
		}
	};
});