export default function Form() {
  return (
    <form action="http://localhost:9999/api/todos/create" method="post">
      <input type="text" />
      <input type="submit" value="作成" />
    </form>
  )
}
