export function Content() {
  return (
    <div
      style={{
        width: "600px",
        margin: "80px auto",
        lineHeight: 1.6,
      }}
    >
      <p>
        <b>Use</b>
        <br />
        Technologies used in production that serve well a certain purpose at
        Choco. We invest in understanding and mastering this tech. This doesn't
        mean the technology should be used for any use case and in any way:
        everything has tradeoffs.
      </p>

      <p>
        <b>Try</b>
        <br />
        Technologies we believe can become "use" and are currently being
        researched, prototyped or tried in production by a team. We keep tech in
        trial until we understand its tradeoffs.
      </p>

      <p>
        <b>Reconsider</b>
        <br />
        Technologies that we used but are currently reconsidering, either
        because it doesn't suit us anymore or because considerably superior
        alternatives exist to a degree it might justify a migration.
      </p>

      <p>
        <b>Hold</b>
        <br />
        Technologies that we used but no longer recommended for new projects.
        Usually can be continued for existing projects, unless stated otherwise.
      </p>
    </div>
  );
}
