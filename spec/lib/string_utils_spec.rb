# -*- coding: utf-8 -*-

require 'spec_helper'

describe :string_utils do
  describe '.scrub_html' do
    context 'strip danger element' do
      it 'tag' do
        expect('<script></script>foo'.scrub_html).to eq('foo')
      end

      it 'attribute' do
        expect('<i style="">foo'.scrub_html).to eq('<i>foo')
      end
    end

    context 'safe element' do
      it 'tag' do
        expect('<br />'.scrub_html).to eq('<br />')
      end

      it 'attribute' do
        expect('<img src="foo.png" />'.scrub_html).to eq('<img src="foo.png" />')
      end

    end
  end
end
