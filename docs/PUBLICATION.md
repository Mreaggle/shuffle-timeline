# Publication notes

The repository should be named `shuffle-timeline`.

The STL page is generated into `dist/STL/` and is configured for GitHub Pages.

Expected public route:

<https://jumpstyle.com.br/STL/>

If `jumpstyle.com.br` is served by the existing Jumpstyle Brasil Pages repository, that hub must either:

- consume this repository as a source and copy the generated `STL/` folder into its own `dist/`, or
- link/route `/STL/` to this Pages project if the domain configuration supports project Pages under the same host.

The repository itself is prepared as an independent Pages project with the correct `/STL/` base path.

## Data note

The project can and should keep its own JSON content file. The restriction is only that STL must not copy JUN's data layer, national registries or historical datasets as if they were Shuffle Timeline data.
