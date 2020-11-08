<div align="center">
  <h1>Octoclairvoyant</h1>
  <img
    src="https://raw.githubusercontent.com/belco90/octoclairvoyant/master/public/mascot-logo.png"
    height="200"
    width="200"
    alt="Octoclairvoyant reading a crystal ball"
  >
  <h3>Compare GitHub repositories releases with ease</h3>
  <p>
    <span role="img" aria-label="Crystall ball">🔮</span> https://octoclairvoyant.now.sh
  </p>
  
  <img src="https://i.imgur.com/bFXUj09.png" alt="App preview" >
</div>


<hr>


### Main Features:

- Filter by range of versions
- Group changes by normalized categories (e.g. put "bug fixes" and "minor" under the same group)
- Sort and prioritize by different level of changes for [Semantic Versioning](https://semver.org/)
- Highlight code blocks syntax and GitHub references
- Spot original version where specific changes were introduced

### Motivation
In January 2020 [GitHub announced a shortcut to compare across two releases](https://github.blog/changelog/2020-01-13-shortcut-to-compare-across-two-releases/).
This shortcut basically leaves you to [pick a release version to compare with from another release version working as base](https://help.github.com/en/github/administering-a-repository/comparing-releases).
Then you'll see a diff of the code between those two versions.
This is a nice addition, so you can see at once all code changes between a range of versions. However, this is not what I expected at all or what I would find most useful when comparing releases.

What did I expect then? I spend a lot of time comparing releases, either for upgrading dependencies at work or in my personal projects. Or even just to be up to date about some library updates.
This process is usually tedious, specially if there are a lot of releases between base and target versions as you need to paginate between multiple pages.
I usually do this process over GitHub releases tab or going through CHANGELOG.md if available. Usually I'm interested in looking for breaking changes more than any other kind of changes.
**So why not comparing changelogs through releases descriptions filtering, grouping and sorting what really matters?**

That's what Octoclairvoyant does for you with their ability to gain information through extrasensory perception! 
It retrieves all the releases description available from a repo, and leaves you filter them by base and target versions.
Then, it will **parse, normalize, group and sort** those changes for you.

But how? Well, there is no mystery on retrieving those descriptions from GitHub right? So let's see those previous points in detail:

##### Parsing
This is the most complex process of the app. Even if there is a big parsing step at first, after some other processes there are also some additional parsings too.
This is done with [unified js](https://unifiedjs.com/), an amazing content compiler to syntax tree. It turns out that this powerful library is heavily used by `mdx-js`, `prettier` or `gatsby`!
So what's the process here? I receive markdown from GitHub releases, and I want to output React elements, so the process is something like this:
> MD --> MDAST --> manipulation explained in steps below --> HTML --> React

The idea behind this is:

1. Convert to MDAST (MarkDown AST) to manipulate the content.
2. Look for interesting content: MD headings, so descriptions can be classified properly. This is when **normalizing** and **grouping** happens.
3. When descriptions are grouped, convert them to HTML and apply some improvements (highlight GitHub references and code blocks).
4. Finally, convert to React to avoid rendering the HTML through `dangerouslySetInnerHTML`. 

##### Normalizing
Semantic Versioning is nice. It's easy to differentiate between changes level just looking at the number position at the version.
Though now everyone refers to each change level in the same way. The 3 changes levels in SemVer are:

- Major <--> Breaking Changes
- Minor <--> Features
- Patch <--> Bug Fixes

This is one of the reasons Octoclairvoyant will normalize the different levels of changes, so it makes sure all the changes
under the same level can be grouped properly. Obviously, it needs to normalize different cases, spacing or wording, as
one repo could refer to patch level as "bugfix" and another one as "BUG FIXES". 

##### Grouping
At the parsing step where the MD is converted into MDAST, it's best opportunity to group changes after being normalized.
This implies put all Breaking Changes together, Features together and so on. What if the group doesn't belong to SemVer tho?
Well, the app will do its best and keep every single category of changes received, and group them if several found. 

##### Sorting
Last but not least: sort the groups by priority. As mentioned in the intro, the group of changes we should worry about the most
is **breaking changes**. Features and Bug Fixes will come next, but what about those groups out of SemVer?
Well, they'll come after SemVer one without any specific order, except some low priority groups as "Credits", "Thanks" or "Artifacts".
So the final sorting will be:

1. BREAKING CHANGES
2. Features
3. Bug fixes
55. ...everything else
97. Credits
97. Thanks
97. Artifacts

### Future Features:

- [ ] Autocomplete repo url input
- [ ] Search versions when typing on selects
- [ ] Restrict from and to version selects when some option is selected
- [ ] Group and sort other versioning system than Semantic Versioning
- [ ] Try to get changes from CHANGELOG.md if repository releases not available
- [ ] Retrieve more releases when repo has more than 100 available (pagination)
- [ ] Options to include pre-releases and drafts within filters
