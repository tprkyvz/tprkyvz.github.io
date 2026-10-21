export default function ShellPrompt({ command, args, session = false }: {
    command: string;
    args?: string;
    session?: boolean;
}) {
    return <div className={`tn-shell${session ? ' tn-shell-session' : ''}`}>
        {session && <span className="tn-shell-user" aria-hidden="true">toprak<span>@</span>web</span>}
        <code><span className="tn-shell-sign" aria-hidden="true">$ </span><span className="tn-shell-command">{command}</span>{args && <> <span className="tn-shell-args">{args}</span></>}</code>
    </div>;
}
