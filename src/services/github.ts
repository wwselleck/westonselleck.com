import axios from "axios";

export async function getMostRecentCommit(username: string, token: string) {
  const api = axios.create({
    auth: {
      username,
      password: token,
    },
  });

  console.log(username);
  const result = await api.get(
    `https://api.github.com/users/${username}/events`
  );
  const { data: events } = result;

  for (const event of events) {
    if (event.type === "PushEvent") {
      const { data: commit } = await api.get(event.payload.commits[0].url);
      const { data: repo } = await api.get(event.repo.url);

      return {
        repo: {
          name: repo.full_name,
          link: repo.html_url,
        },
        date: new Date(event.created_at),
        link: commit.html_url,
        message: commit.commit.message,
      };
    }
  }
}
