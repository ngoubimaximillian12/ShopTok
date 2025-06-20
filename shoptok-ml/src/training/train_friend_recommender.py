import tensorflow as tf
import tensorflow_recommenders as tfrs
import tensorflow_datasets as tfds

class FriendModel(tfrs.Model):
    def __init__(self, user_vocab):
        super().__init__()
        embedding_dim = 32
        self.user_embedding = tf.keras.Sequential([
            tf.keras.layers.StringLookup(vocabulary=user_vocab, mask_token=None),
            tf.keras.layers.Embedding(len(user_vocab) + 1, embedding_dim)
        ])
        self.query_embedding = tf.keras.layers.Dense(embedding_dim)
        self.candidate_embedding = tf.keras.layers.Dense(embedding_dim)
        self.task = tfrs.tasks.Retrieval(metrics=tfrs.metrics.FactorizedTopK(
            candidates=tf.data.Dataset.from_tensor_slices(user_vocab).batch(128).map(self.user_embedding)
        ))

    def compute_loss(self, features, training=False):
        query_embeddings = self.user_embedding(features["query_user_id"])
        candidate_embeddings = self.user_embedding(features["candidate_user_id"])
        return self.task(query_embeddings, candidate_embeddings)

def load_data():
    # Placeholder: load your user interaction data here
    user_ids = ["user1", "user2", "user3"]
    candidates = ["user2", "user3", "user1"]
    dataset = tf.data.Dataset.from_tensor_slices({
        "query_user_id": user_ids,
        "candidate_user_id": candidates
    }).batch(2)
    return dataset

def main():
    user_vocab = ["user1", "user2", "user3"]
    model = FriendModel(user_vocab)
    dataset = load_data()

    model.compile(optimizer=tf.keras.optimizers.Adagrad(learning_rate=0.1))
    model.fit(dataset, epochs=3)
    model.save("friend_model")

if __name__ == "__main__":
    main()
