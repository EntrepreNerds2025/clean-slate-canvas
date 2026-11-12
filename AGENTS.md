<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public contact submissions use a validated TanStack server route and Lovable Cloud storage so privileged credentials never reach browser code.
- App emails use Lovable-managed React Email templates and feature-specific server-side triggers; never expose a generic browser-callable send endpoint.
