# strapi-exporter

Export content from [Strapi CMS](https://strapi.io/)

_Sponsored by [X-Team](https://x-team.com)_

```
Usage: strapi-exporter -u [Strapi URL] -o [Output Directory] -t [Content Type]

Options:
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
  --url, -u         URL of Strapi CMS                        [string] [required]
  --out, -o         Directory to write exported files.       [string] [required]
  --type, -t        Content type to export (directory will be created with
                    matching name)                           [string] [required]
  --name-field, -f  Field to use as the filename of the exported object
                    (default: _id)                                      [string]
```

## Authenticating

If your `strapi` content is access-protected, you can provide auth details by setting environment variables `STRAPI_USER` and `STRAPI_PASSWORD`.
