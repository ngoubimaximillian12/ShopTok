import tensorflow as tf
import tensorflow_recommenders as tfrs

class ProductModel(tfrs.Model):
    def __init__(self, product_vocab):
        super().__init__()
        embedding_dim = 32
        self.product_embedding = tf.keras.Sequential([
            tf.keras.layers.StringLookup(vocabulary=product_vocab, mask_token=None),
            tf.keras.layers.Embedding(len(product_vocab) + 1, embedding_dim)
        ])
        self.task = tfrs.tasks.Retrieval(metrics=tfrs.metrics.FactorizedTopK(
            candidates=tf.data.Dataset.from_tensor_slices(product_vocab).batch(128).map(self.product_embedding)
        ))

    def compute_loss(self, features, training=False):
        query_embeddings = self.product_embedding(features["query_product_id"])
        candidate_embeddings = self.product_embedding(features["candidate_product_id"])
        return self.task(query_embeddings, candidate_embeddings)

def load_data():
    # Placeholder: load your product interaction data here
    product_ids = ["prod1", "prod2", "prod3"]
    candidates = ["prod2", "prod3", "prod1"]
    dataset = tf.data.Dataset.from_tensor_slices({
        "query_product_id": product_ids,
        "candidate_product_id": candidates
    }).batch(2)
    return dataset

def main():
    product_vocab = ["prod1", "prod2", "prod3"]
    model = ProductModel(product_vocab)
    dataset = load_data()

    model.compile(optimizer=tf.keras.optimizers.Adagrad(learning_rate=0.1))
    model.fit(dataset, epochs=3)
    model.save("product_model")

if __name__ == "__main__":
    main()
