import { Schema, model, models } from 'mongoose';

const RecipeSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    area: { type: String, required: true },
    instructions: { type: String, required: true },
    thumb: { type: String, default: '/placeholder.jpg' },
}, { timestamps: true });

const Recipe = models.Recipe || model('Recipe', RecipeSchema);

export default Recipe;