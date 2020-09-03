# Email Html

## Best practices

- Use `table`s not `div`s
- #ffffff instead of #fff
- Padding instead of margin
- CSS2 instead of CSS3
- HTML4 instead of HTML5
- `background-color` instead of `background`
- HTML attributes instead of CSS2
- Inline CSS instead of stylesheets

## Tables
When using tables use :

```html
<table border="0" cellpadding="0" cellspacing="0">...</table>
```

## Gmail will strip any CSS that is not inlined
Solutions:
- Write CSS inline as you go
- Use a web-based CSS inliner
  - [Campaign Monitor](http://inliner.cm/)
  - [Mailchimp](http://templates.mailchimp.com/resources/inline-css/)
  - [Zurb's Ink](http://zurb.com/ink/inliner.php)
- Use a programmatic CSS inliner
  - [Premailer gem](https://github.com/premailer/premailer)
- Let your ESP handle the inlining for you
